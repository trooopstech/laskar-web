const SentryCli = require("@sentry/cli");

async function uploadSourcemapsAndRelease() {
  const release = "1.3";
  if (!release) {
    return;
  }
  const cli = new SentryCli();
  try {
    console.log("Creating sentry release " + release);
    // creates a new release, in our case its 1.3
    await cli.releases.new(release);

    // uploads already generated source maps by CRA to sentry
    await cli.releases.uploadSourceMaps(release, {
      include: ["build/static/js"],
      urlPrefix: "~/static/js",
      rewrite: false,
    });
    await cli.releases.finalize(release);
  } catch (e) {
    console.error("uploading failed:", e);
  }
}
uploadSourcemapsAndRelease();
