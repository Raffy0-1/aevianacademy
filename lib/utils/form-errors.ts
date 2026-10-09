import { FieldErrors } from "react-hook-form";

/**
 * Automatically navigates/scrolls smoothly to the first field that failed form validation
 * and gives it focus.
 */
export function scrollToFirstError(errors: FieldErrors) {
  const errorKeys = Object.keys(errors);
  if (errorKeys.length === 0) return;

  const firstKey = errorKeys[0];

  // Try multiple selector approaches (name attribute, id attribute)
  const element =
    document.querySelector(`[name="${firstKey}"]`) ||
    document.getElementById(firstKey) ||
    document.querySelector(`[data-field="${firstKey}"]`);

  if (element && element instanceof HTMLElement) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    
    // Focus after brief scroll delay
    setTimeout(() => {
      element.focus();
      // Add subtle highlight flash
      element.classList.add("ring-2", "ring-rose-500", "ring-offset-2");
      setTimeout(() => {
        element.classList.remove("ring-2", "ring-rose-500", "ring-offset-2");
      }, 2500);
    }, 280);
  }
}
