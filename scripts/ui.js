export function renderActivities(activities, container) {
  container.replaceChildren();

  if (activities.length === 0) {
    const message = document.createElement("p");
    message.textContent =
      "No activities found. Try another search or add an activity.";
    container.appendChild(message);
    return;
  }

  activities.forEach((activity) => {
    const card = document.createElement("article");
    card.className = "activity-card";

    const heading = document.createElement("h3");
    heading.textContent = activity.title;

    const date = document.createElement("p");
    date.textContent = `Due date: ${activity.dueDate}`;

    const duration = document.createElement("p");
    duration.textContent = `Duration: ${activity.duration} minutes`;

    const tag = document.createElement("p");
    tag.textContent = `Category: ${activity.tag}`;

    const status = document.createElement("p");
    status.textContent = activity.completed
      ? "Status: Completed"
      : "Status: Pending";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.dataset.action = "edit";
    editButton.dataset.id = activity.id;
    editButton.setAttribute("aria-label", `Edit ${activity.title}`);

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.textContent = activity.completed
      ? "Mark as pending"
      : "Mark as completed";
    completeButton.dataset.action = "toggle";
    completeButton.dataset.id = activity.id;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = activity.id;
    deleteButton.setAttribute("aria-label", `Delete ${activity.title}`);

    card.append(
      heading,
      date,
      duration,
      tag,
      status,
      editButton,
      completeButton,
      deleteButton
    );

    container.appendChild(card);
  });
}

export function renderDashboardStats(activities) {
  const total = activities.length;

  const completed = activities.filter(
    (activity) => activity.completed
  ).length;

  const today = new Date();
  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  const upcoming = activities.filter(
    (activity) =>
      !activity.completed && activity.dueDate >= todayKey
  ).length;

  const totalDuration = activities.reduce(
    (sum, activity) => sum + activity.duration,
    0
  );

  document.getElementById("total-activities").textContent = total;
  document.getElementById("completed-activities").textContent = completed;
  document.getElementById("upcoming-activities").textContent = upcoming;
  document.getElementById("total-duration").textContent =
    `${totalDuration} minutes (${(totalDuration / 60).toFixed(1)} hours)`;

  // Find the current week, Monday through Sunday.
  const monday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const daysSinceMonday = (monday.getDay() + 6) % 7;
  monday.setDate(monday.getDate() - daysSinceMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  function toDateKey(date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0")
    ].join("-");
  }

  const weekStart = toDateKey(monday);
  const weekEnd = toDateKey(sunday);

  const weeklyMinutes = activities
    .filter(
      (activity) =>
        activity.dueDate >= weekStart &&
        activity.dueDate <= weekEnd
    )
    .reduce((sum, activity) => sum + activity.duration, 0);

  const storedTarget = localStorage.getItem(
    "campusLifePlannerDurationTarget"
  );

  const parsedTarget = storedTarget === null
    ? 600
    : Number(storedTarget);

  const target =
    Number.isSafeInteger(parsedTarget) && parsedTarget >= 0
      ? parsedTarget
      : 600;

  const progress = document.getElementById("weekly-progress");
  const progressText = document.getElementById("weekly-progress-text");
  const hoursText = document.getElementById("weekly-progress-hours");

  progress.max = Math.max(target, 1);
  progress.value = target > 0
    ? Math.min(weeklyMinutes, target)
    : 0;

  progressText.textContent =
    `${weeklyMinutes} of ${target} minutes planned this week.`;

  hoursText.textContent =
    `${(weeklyMinutes / 60).toFixed(1)} of ${(target / 60).toFixed(1)} hours`;
}
