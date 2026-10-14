
const STORAGE_KEY = "campusLifePlannerActivities";

export function saveActivities(activities) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    return true;
  } catch (error) {
    console.error("Could not save activities:", error);
    return false;
  }
}

export function loadActivities() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return [];
    }

    const activities = JSON.parse(savedData);

    if (!Array.isArray(activities)) {
      return [];
    }

    return activities.filter((activity) =>
      activity &&
      typeof activity.id === "number" &&
      typeof activity.title === "string" &&
      typeof activity.dueDate === "string" &&
      typeof activity.duration === "number" &&
      typeof activity.tag === "string" &&
      typeof activity.completed === "boolean"
    );
  } catch (error) {
    console.error("Could not load activities:", error);
    return [];
  }
}
