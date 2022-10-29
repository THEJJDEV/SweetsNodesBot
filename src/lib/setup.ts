import "moment-duration-format";
import figlet from "figlet";
import gradient from "gradient-string";

figlet("SweetsNodes", (e: any, d: string) => {
  console.log(gradient.atlas.multiline(d));
});
