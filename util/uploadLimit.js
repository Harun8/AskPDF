function uploadLimit(plan) {
  console.log("plan", typeof plan)
  if (plan === "") console.log("plan is an empty string mannn")
  let uploadLimit;
  // change to a switch case when u see this
  if (plan === null || plan  === "") {
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
    uploadLimit = 100; // 100 pdf uploads
  }

  return uploadLimit;
}

export { uploadLimit };
