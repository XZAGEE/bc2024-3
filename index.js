const fs = require("node:fs");
const { Command } = require("commander");
const program = new Command();

program
  .requiredOption("-i, --input <PATH>", "Path to the input file")
  .requiredOption("-o, --output [PATH]", "Path to the output file")
  .option("-d, --display", "Display the result");
program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
} else if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

const dataJSON = JSON.parse(fs.readFileSync(options.input, { encoding: "utf8" }));
const dataFiltered = filteredData(dataJSON, "BS3_BanksLiab");

function filteredData(data, parent) {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i].parent === parent) {
      if (result.length > 0) {
        result += "\n";
      }
      result += `${data[i].txten}:${data[i].value}`;
    }
  }return result;
}

if (dataFiltered.length === 0) {
  console.error("No element found");
}

if (!options.output && !options.display) {
  process.exit(0);
} else {
  if (options.output) {
    fs.writeFileSync(options.output, dataFiltered);
    console.log(`The result is written to: ${options.output}`);
  }
  if (options.display) {
    console.log(dataFiltered);
  }
}
