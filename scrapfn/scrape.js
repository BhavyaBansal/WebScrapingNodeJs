const puppeteer = require('puppeteer');
const fs = require('fs');
const data = {
    list:[]
}
async function main(skill){
  //launches chromium
  const browser = await puppeteer.launch({ headless: false }); //false because we have to open the chromium
  //open new tab
  //https://in.indeed.com/jobs?q=${skill}&l=Bangalore%2C+Karnataka
  const page = await browser.newPage();
  await page.goto(
    `https://in.indeed.com/jobs?q=${skill}&l=Bangalore%2C+Karnataka`,{
    timeout: 0,
    waitUntil: 'networkidle0'
});
  // const pdf = page.pdf({
  //   path:'',
  //   format: "A4"
  // });
  // const screenshot = page.screenshot({
  //   path:'',
  //   fullPage:true
  // })
  //this below line will give whole html in this data 
  const jobData = await page.evaluate(async (data)=>{
    const items = document.querySelectorAll('td.resultContent');
    items.forEach((item,index)=>{
      const title = item.querySelector('h2.jobTitle>a')?.innerText;
      const link = item.querySelector('h2.jobTitle>a')?.href;
      let salary = item.querySelector(
        "div.metadata.salary-snippet-container > div"
      )?.innerText;
      const compName = item.querySelector('span.companyName')?.innerText;
      if(salary === null){
        salary = "Not Defined";
      }
      data.list.push({
        title,
        salary,
        compName,
        link
      })
    })
    return data;
  },data);

  let response = await jobData;
  let json = JSON.stringify(jobData,null,2);
  fs.writeFile('job.json',json,'utf-8',()=>{
    console.log('written in job.json');
  })
  browser.close();
  return response;
};

module.exports = main;