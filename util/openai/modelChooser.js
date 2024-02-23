function modelChooser(plan) {
  console.log("plan", plan);
  let modelChooser;
  // change to a switch case when u see this
  if (plan == null) {
    // free plan
    modelChooser = "gpt-3.5-turbo-0125"; // 1 pdf upload
  } else if (
    plan === "price_1OdUr0BzVPtG7eO2qrV6Zn89" ||
    plan === "price_1OmhlyBzVPtG7eO2r61Xi5QQ"
  ) {
    // premium
    modelChooser = "gpt-4-0125-preview"; // 50 pdf uploads
  } else if (
    plan === "price_1OdYTmBzVPtG7eO2uLsTNHqI" ||
    plan === "price_1OmhlyBzVPtG7eO2r61Xi5QQ"
  ) {
    // ultimate plan
    modelChooser = "gpt-4-0125-preview"; // 100 pdf uploads
  }

  console.log("model IS", modelChooser);
  return modelChooser;
}

export { modelChooser };
