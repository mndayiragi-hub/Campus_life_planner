
const TITLE_PATTERN = /^(?=\S).*\S$/;
const DURATION_PATTERN = /^(0|[1-9]\d*)$/;
const DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const TAG_ALLOWED_CHARACTERS_PATTERN = /^[A-Za-z -]+$/;

const TAG_PATTERN = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

const DUPLICATE_WORD_PATTERN = /\b(\w+)\s+\1\b/i;

export function validateTitle(title) {
  if (typeof title !== "string" || !TITLE_PATTERN.test(title)) {
    return "Title cannot be empty or have leading/trailing spaces.";
  }

  if (DUPLICATE_WORD_PATTERN.test(title)) {
    return "Title must not contain repeated consecutive words.";
  }

  if (title.trim().length > 100) {
    return "Title must be 100 characters or fewer.";
  }

  return "";
}

export function validateDuration(duration) {
  if (!DURATION_PATTERN.test(String(duration))) {
    return "Duration must be a non-negative whole number.";
  }

  return "";
}

export function validateDate(date) {
  if (typeof date !== "string" || !DATE_PATTERN.test(date)) {
    return "Date must use YYYY-MM-DD format.";
  }

  const [year, month, day] = date.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return "Please enter a real calendar date.";
  }

  return "";
}

export function validateTag(tag) {
  if (
    typeof tag !== "string" ||
    !TAG_ALLOWED_CHARACTERS_PATTERN.test(tag) ||
    !TAG_BOUNDARY_PATTERN.test(tag) ||
    !TAG_PATTERN.test(tag)
  ) {
    return "Tag must start and end with a letter, using single spaces or hyphens between words.";
  }

  return "";
}

export function validateActivity(activity) {
  const errors = {};

  errors.title = validateTitle(activity.title);
  errors.dueDate = validateDate(activity.dueDate);
  errors.duration = validateDuration(activity.duration);
  errors.tag = validateTag(activity.tag);

  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => message !== "")
  );
}
