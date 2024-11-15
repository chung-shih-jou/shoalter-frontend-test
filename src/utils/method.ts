export const isMobile = (userAgent: string): boolean => {
  return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);
};

export const safeJsonParse = (str: string): any => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.log("safeJsonParse", e);
    return null;
  }
};
