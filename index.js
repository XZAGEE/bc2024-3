const fs = require("node:fs");
const { Command } = require("commander");
const program = new Command();

program
  .option("-i, --input <PATH>", "Path to the input file")
  .option("-o, --output [PATH]", "Path to the output file")
  .option("-d, --display", "Display the result ");
program.parse(process.argv);

const options = program.opts();

if (!options.input) {
    throw new Error("Please, specify input file");
  } else if (!fs.existsSync(options.input)){
      throw new Error("Cannot find input file");
  }

const dataJSON = JSON.parse(fs.readFileSync(options.input, {encoding:"utf8"}));
const dataFiltered = dataJSON
.filter(elem => elem.parent === "BS3_BanksLiab")
.map(elem => `${elem.txten}:${elem.value}`)
.join("\n")

if (dataFiltered.length === 0) {
console.error("No element found");
}

if (!options.output && !options.display) {
  process.exit(0);
} else {
  if (options.output) {
    fs.writeFileSync(options.output, dataFiltered);
    console.log(`The result is written to: ${options.output}`);
} if (options.display) {
    console.log(dataFiltered);
  }
}
 


/* if (options.output){
  fs.writeFileSync(options.output, {encoding: "utf8"});
} else if (){};
 
    if (options.display){
      console.log(data);
    }
    if (options.output && options.display) {
        fs.writeFileSync(options.output, data)
        console.log(data);
      }
    if (!options.output && !options.display) {
      process.exit();
    }

if (options.display && options.output){

};
 */