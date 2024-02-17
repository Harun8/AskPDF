function fileSizeLimit(plan) {
  console.log("plan", plan);
  let fileSizeLimit;
  // change to a switch case when u see this
  if (plan == null) {
    // free plan
    fileSizeLimit = 5 * 1024 * 1024; // 5MB
  } else if (plan === "price_1OdUr0BzVPtG7eO2qrV6Zn89") {
    // premium
    fileSizeLimit = 10 * 1024 * 1024; // 10MB
  } else if (plan === "price_1OdYTmBzVPtG7eO2uLsTNHqI") {
    // ultimate plan
    fileSizeLimit = 50 * 1024 * 2024; // 50 MB
  }

  return fileSizeLimit;
}

export { fileSizeLimit };
