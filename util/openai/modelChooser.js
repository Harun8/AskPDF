function modelChooser(plan) {
  console.log("plan", plan);
  let modelChooser;
  // change to a switch case when u see this
  if (plan == null) {
    // free plan
    modelChooser = "gpt-3.5-turbo-0125"; // 1 pdf upload
  } else if (
    plan === "price_1OpYyoBzVPtG7eO2xJAtCiFa" ||
    plan === "price_1OpYlBBzVPtG7eO2D4il1zcz"
  ) {
    // premium
    modelChooser = "gpt-4-0125-preview"; // 50 pdf uploads
  } else if (
    plan === "price_1OpYzEBzVPtG7eO2xS53tGQ0" ||
    plan === "price_1OpYzuBzVPtG7eO2oCFa8Sc7"
  ) {
    // ultimate plan
    modelChooser = "gpt-4-0125-preview"; // 100 pdf uploads
  }

  console.log("model IS", modelChooser);
  return modelChooser;
}

export { modelChooser };
