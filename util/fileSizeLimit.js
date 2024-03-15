function fileSizeLimit(plan) {
  let fileSizeLimit;
  // change to a switch case when u see this
  if (plan == null) {
    // free plan
    fileSizeLimit = 5 * 1024 * 1024; // 5MB
  } else if (
    plan === "price_1OpYyoBzVPtG7eO2xJAtCiFa" ||
    plan === "price_1OpYlBBzVPtG7eO2D4il1zcz"
  ) {
    // premium
    fileSizeLimit = 10 * 1024 * 1024; // 10MB
  } else if (
    plan === "price_1OpYzEBzVPtG7eO2xS53tGQ0" ||
    plan === "price_1OpYzuBzVPtG7eO2oCFa8Sc7"
  ) {
    // ultimate plan
    fileSizeLimit = 50 * 1024 * 2024; // 50 MB
  }

  return fileSizeLimit;
}

export { fileSizeLimit };
