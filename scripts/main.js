
import {
  validateTitle,
  validateDuration,
  validateDate,
  validateTag
} from "./validators.js";

import {
  getActivities,
  addActivity,
  updateActivity,
  deleteActivity,
  toggleActivity,
  replaceActivities
} from "./state.js";

import {
  renderActivities,
  renderDashboardStats
} from "./ui.js";

import {
  searchActivities,
  sortActivities
} from "./search.js";
const exportButton = document.getElementById("export-json");
const importInput = document.getElementById("import-json");
const settingsStatus = document.getElementById("settings-status");
const settingsForm = document.getElementById("settings-form");
const durationTargetInput = document.getElementById("duration-target");
const TARGET_KEY = "campusLifePlannerDurationTarget";
const form = document.getElementById("activity-entry-form");
const errorMessage = document.getElementById("error-message");
const durationStatus = document.getElementById("duration-status");
const formStatus = document.getElementById("form-status");
const activityList = document.getElementById("activity-list");

const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const caseInsensitive = document.getElementById("case-insensitive");
const searchHelp = document.getElementById("search-help");

const formTitle = document.getElementById("form-title");
const submitButton = form.querySelector('button[type="submit"]');
const cancelEditButton = document.getElementById("cancel-edit");

let editingId = null;

function refreshDashboard() {
  const activities = getActivities();

  renderDashboardStats(activities);

  const { results, error } = searchActivities(
    activities,
    searchInput.value,
    caseInsensitive.checked
  );

  const displayedActivities = error ? activities : results;

  renderActivities(
    sortActivities(displayedActivities, sortSelect.value),
    activityList
  );

  searchHelp.textContent = error
    ? error
    : "Enter a regex pattern to search titles and tags.";
}

function resetEditor() {
  editingId = null;
  form.reset();
  formTitle.textContent = "Add a New Activity";
  submitButton.textContent = "Save Activity";
  cancelEditButton.hidden = true;
  errorMessage.textContent = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("activity-title").value;
  const dueDate = document.getElementById("due-date").value;
  const duration = document.getElementById("duration").value;
  const tag = document.getElementById("activity-tag").value;

  const errors = {
    title: validateTitle(title),
    dueDate: validateDate(dueDate),
    duration: validateDuration(duration),
    tag: validateTag(tag)
  };

  const messages = Object.values(errors).filter(Boolean);

  if (messages.length > 0) {
    errorMessage.textContent = messages.join(" ");
    durationStatus.textContent =
      "Please correct the errors in your form.";
    return;
  }

  if (editingId !== null) {
    updateActivity(editingId, {
      title: title.trim(),
      dueDate,
      duration: Number(duration),
      tag: tag.trim()
    });

    durationStatus.textContent = "Activity updated successfully!";
    formStatus.textContent = "Your activity has been updated.";
  } else {
    addActivity({ title, dueDate, duration, tag });

    durationStatus.textContent = "Activity added successfully!";
    formStatus.textContent = "Your activity has been saved.";
  }

  resetEditor();
  refreshDashboard();
});

activityList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button || !activityList.contains(button)) {
    return;
  }

  const id = Number(button.dataset.id);

  if (button.dataset.action === "edit") {
    const activity = getActivities().find(
      (item) => item.id === id
    );

    if (!activity) {
      return;
    }

    editingId = activity.id;

    document.getElementById("activity-title").value = activity.title;
    document.getElementById("due-date").value = activity.dueDate;
    document.getElementById("duration").value = activity.duration;
    document.getElementById("activity-tag").value = activity.tag;

    formTitle.textContent = "Edit Activity";
    submitButton.textContent = "Update Activity";
    cancelEditButton.hidden = false;
    errorMessage.textContent = "";
    formStatus.textContent = `Editing ${activity.title}.`;

    document.getElementById("activity-title").focus();
    document.getElementById("activity-form").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    return;
  }

  if (button.dataset.action === "delete") {
    deleteActivity(id);

    if (editingId === id) {
      resetEditor();
    }

    durationStatus.textContent = "Activity deleted.";
  } else if (button.dataset.action === "toggle") {
    toggleActivity(id);
    durationStatus.textContent = "Activity status updated.";
  } else {
    return;
  }

  refreshDashboard();
});

cancelEditButton.addEventListener("click", () => {
  resetEditor();
  formStatus.textContent = "Editing cancelled.";
});

searchInput.addEventListener("input", refreshDashboard);
sortSelect.addEventListener("change", refreshDashboard);
caseInsensitive.addEventListener("change", refreshDashboard);

const savedTarget = localStorage.getItem(TARGET_KEY);

if (savedTarget !== null) {
  const target = Number(savedTarget);

  if (Number.isSafeInteger(target) && target >= 0) {
    durationTargetInput.value = target;
  }
}
settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const targetValue = durationTargetInput.value.trim();
  const target = Number(targetValue);

  if (
    targetValue === "" ||
    !Number.isSafeInteger(target) ||
    target < 0
  ) {
    settingsStatus.textContent =
      "Enter a non-negative whole number for your weekly target.";
    return;
  }

  try {
    localStorage.setItem(TARGET_KEY, String(target));

    settingsStatus.textContent =
      `Weekly target saved: ${target} minutes (${(target / 60).toFixed(1)} hours).`;
  } catch (error) {
    settingsStatus.textContent =
      "Could not save your weekly target. Please check browser storage.";
  }
});

refreshDashboard();
exportButton.addEventListener("click", () => {
  const backup = {
    version: 1,
    exportedAt: new Date().toISOString(),
    activities: getActivities()
  };

  const blob = new Blob(
    [JSON.stringify(backup, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "campus-life-planner-backup.json";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);

  settingsStatus.textContent =
    `Exported ${backup.activities.length} activities successfully.`;
});

importInput.addEventListener("change", () => {
  const file = importInput.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    try {
      const backup = JSON.parse(reader.result);

      if (
        !backup ||
        backup.version !== 1 ||
        !Array.isArray(backup.activities)
      ) {
        throw new Error("This is not a valid Campus Life Planner backup.");
      }

      const importedActivities = backup.activities;

      for (const [index, activity] of importedActivities.entries()) {
        if (
          !activity ||
          typeof activity.title !== "string" ||
          typeof activity.dueDate !== "string" ||
          typeof activity.duration !== "number" ||
          typeof activity.tag !== "string" ||
          typeof activity.completed !== "boolean"
        ) {
          throw new Error(`Activity ${index + 1} has invalid data.`);
        }

        const errors = [
          validateTitle(activity.title),
          validateDate(activity.dueDate),
          validateDuration(String(activity.duration)),
          validateTag(activity.tag)
        ].filter(Boolean);

        if (errors.length > 0) {
          throw new Error(
            `Activity ${index + 1}: ${errors.join(" ")}`
          );
        }
      }

      replaceActivities(importedActivities);

      resetEditor();

      refreshDashboard();

      settingsStatus.textContent =
        `Imported ${importedActivities.length} activities successfully.`;
    } catch (error) {
      settingsStatus.textContent = `Import failed: ${error.message}`;
    } finally {
      importInput.value = "";
    }
  });

  reader.addEventListener("error", () => {
    settingsStatus.textContent = "Could not read the selected file.";
    importInput.value = "";
  });

  reader.readAsText(file);
});
