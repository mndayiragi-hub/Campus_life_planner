
import { saveActivities, loadActivities } from "./storage.js";

let activities = loadActivities();

let nextId = activities.reduce(
  (largestId, activity) => Math.max(largestId, activity.id),
  0
) + 1;

function persistActivities() {
  const saved = saveActivities(activities);

  if (!saved) {
    console.error("Your changes could not be saved.");
  }

  return saved;
}

export function getActivities() {
  return activities;
}

export function addActivity(activity) {
  const newActivity = {
    id: nextId++,
    title: activity.title.trim(),
    dueDate: activity.dueDate,
    duration: Number(activity.duration),
    tag: activity.tag.trim(),
    completed: false
  };

  activities.push(newActivity);
  persistActivities();
  return newActivity;
}

export function deleteActivity(id) {
  activities = activities.filter(
    (activity) => activity.id !== id
  );

  persistActivities();
}

export function updateActivity(id, updates) {
  activities = activities.map((activity) =>
    activity.id === id
      ? { ...activity, ...updates, id: activity.id }
      : activity
  );

  persistActivities();
}

export function toggleActivity(id) {
  activities = activities.map((activity) =>
    activity.id === id
      ? { ...activity, completed: !activity.completed }
      : activity
  );

  persistActivities();
}

export function clearActivities() {
  activities = [];
  nextId = 1;
  persistActivities();
}


export function replaceActivities(importedActivities) {
  activities = importedActivities.map((activity, index) => ({
    id: index + 1,
    title: activity.title.trim(),
    dueDate: activity.dueDate,
    duration: Number(activity.duration),
    tag: activity.tag.trim(),
    completed: activity.completed
  }));

  nextId = activities.length + 1;
  persistActivities();

  return activities;
}
