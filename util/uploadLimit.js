function uploadLimit(plan) {
  console.log("plan", plan);
  let uploadLimit;
  // change to a switch case when u see this
  if (plan == null) {
    // free plan
    uploadLimit = 1; // 1 pdf upload
  } else if (plan === "price_1OdUr0BzVPtG7eO2qrV6Zn89") {
    // premium
    uploadLimit = 50; // 50 pdf uploads
  } else if (plan === "price_1OdYTmBzVPtG7eO2uLsTNHqI") {
    // ultimate plan
    uploadLimit = 10; // 100 pdf uploads
  }

  return uploadLimit;
}

export { uploadLimit };
