function uploadLimit(plan) {
  let uploadLimit;
  // change to a switch case when u see this
  if (plan == null) {
    // free plan
    uploadLimit = 1; // 1 pdf upload
  } else if (
    plan === "price_1OpYyoBzVPtG7eO2xJAtCiFa" ||
    plan === "price_1OpYlBBzVPtG7eO2D4il1zcz"
  ) {
    // premium
    uploadLimit = 50; // 50 pdf uploads
  } else if (
    plan === "price_1OpYzEBzVPtG7eO2xS53tGQ0" ||
    plan === "price_1OpYzuBzVPtG7eO2oCFa8Sc7"
  ) {
    // ultimate plan
    uploadLimit = 10; // 100 pdf uploads
  }

  return uploadLimit;
}

export { uploadLimit };
