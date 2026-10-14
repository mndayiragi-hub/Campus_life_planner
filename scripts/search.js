export function searchActivities(
  activities,
  pattern = "",
  caseInsensitive = true
) {
  const trimmedPattern = pattern.trim();

  if (!trimmedPattern) {
    return {
      results: [...activities],
      error: ""
    };
  }

  try {
    const flags = caseInsensitive ? "i" : "";
    const regex = new RegExp(trimmedPattern, flags);

    const results = activities.filter((activity) => {
      return (
        regex.test(activity.title) ||
        regex.test(activity.tag)
      );
    });

    return { results, error: "" };
  } catch {
    return {
      results: [],
      error: "Invalid regular expression. Check your pattern and try again."
    };
  }
}

export function sortActivities(activities, sortBy = "date-asc") {
  const sorted = [...activities];

  switch (sortBy) {
    case "date-asc":
      return sorted.sort((a, b) =>
        a.dueDate.localeCompare(b.dueDate)
      );

    case "date-desc":
      return sorted.sort((a, b) =>
        b.dueDate.localeCompare(a.dueDate)
      );

    case "title-asc":
      return sorted.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    case "title-desc":
      return sorted.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

    case "duration-asc":
      return sorted.sort((a, b) =>
        a.duration - b.duration
      );

    case "duration-desc":
      return sorted.sort((a, b) =>
        b.duration - a.duration
      );

    default:
      return sorted.sort((a, b) =>
        a.dueDate.localeCompare(b.dueDate)
      );
  }
}
