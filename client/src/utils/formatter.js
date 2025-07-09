// Format timestamp to readable time (e.g., "2:45 PM")
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

// Capitalize first letter of every word
export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Format price with currency symbol
export const formatPrice = (amount) => {
  return `₹${Number(amount).toFixed(2)}`;
};

// Truncate long messages (e.g., for menu descriptions)
export const truncateText = (text, limit = 100) => {
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

// Format chatbot menu options
export const formatBotMenuOptions = (optionsArray) => {
  return optionsArray
    .map((option, index) => `${index + 1}. ${option}`)
    .join('\n');
};
