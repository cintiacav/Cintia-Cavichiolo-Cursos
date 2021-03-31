//imports
import {promises as fs, writeFile, writeFileSync} from "fs";
import { userInfo } from "os";
import { inherits } from "util";

//const
const stateFile = "./json/Estados.json";
const cityFile = "./json/Cidades.json";
const pathJsonCities = "./json/cities/";

let mapState = null;
let mapCity = null;
const FORMATO = "utf8";
const JSONEXT=".json";

//init
await readFiles();
await writeFiles();
await manipulateCities();

async function readFiles(){

    let jsonState =  await readFile(stateFile);   
    mapState = jsonState.map(state =>{
        const { id, name } = state;
         
          return{
              id: state.ID,
              ab: state.Sigla,
              name: state.Nome
          };
          
      });      
    let jsonCity =  await readFile(cityFile);
    mapCity = jsonCity.map(city =>{
        const { idState, name } = city;
         
          return{
              idState: city.Estado,
              name: city.Nome
          };
          
    });   

}

async function readFile(nomeArquivo){
    try{
        const data = await fs.readFile(nomeArquivo,FORMATO);
        return JSON.parse(data);
    }catch(err){
        console.log(err);
    }
}

async function writeFiles(){    
    mapState.forEach(state =>{
        let cities = "[";
        mapCity.forEach(city => {
            if(city.idState === state.id){
                                
                cities += `{ "idState": "${city.idState}", "name": "${city.name}" } ,\n`;
            }           
        });    
       cities = cities.substring(0, cities.length-2) + "]";
        let fileName = `${pathJsonCities}${state.ab}${JSONEXT}`

        writeCityFile(fileName, cities);
    });
   
}

async function writeCityFile(nameFile, cities){
    try{
        await fs.writeFile(nameFile,cities);       
    }catch(err){
        console.log(err);
    }
}

async function countCityByState(uf){
    const fileName = `${pathJsonCities}${uf}${JSONEXT}`;
    const dataCity = await readFile(fileName);    
    return dataCity.length;    
}

async function printDataCitiesByState(sort){
    let mapSumCities = new Map();
    for(const state of mapState){
        const countCity = await countCityByState(state.ab);
        mapSumCities.set(state.ab,parseInt(countCity));           
    }     
    return sortNumberAndGet(mapSumCities,sort);    
}

function sortNumberAndGet(map, sort){
    var mapSort = new Map([...map.entries()]
    .sort((a, b) =>{
        if(sort === 'ASC'){
            return parseInt(a[1]) - parseInt(b[1])
        }else if (sort === 'DESC'){
            return parseInt(b[1]) - parseInt(a[1])
        }
    }));
    
    return getTop(5,mapSort);
}


function getTop(count, mapValues){
    let jsonReturn = "[";
    let i=0;
    mapValues.forEach((value1,value2)=>{
        if(i < count){
            jsonReturn += `"${value2} - ${value1}",`;
            i++;
        }
    });
    jsonReturn = jsonReturn.substring(0, jsonReturn.length-1) + "]";
    return jsonReturn;
}
function sortLengthAndGet(map, sort){

        map.sort((a,b) => {           
                return a.name.localeCompare(b.name);         
        }).sort((a,b) => { 
            if(sort === 'ASC'){
                return a.name.length - b.name.length 
            } else if( sort === 'DESC'){
                return b.name.length - a.name.length 
            }
        });
        return map;
}
async function countNameByState(sort){
    let jsonReturn = "[";
    let mapMaxCountNamebyState = new Map();
    for(const state of mapState){
       
        const fileName = `${pathJsonCities}${state.ab}${JSONEXT}`;
        let dataCity = await readFile(fileName);
         
        dataCity = sortLengthAndGet(dataCity,sort);
        
        jsonReturn += ` "${dataCity[0].name} - ${state.ab}",`; // - ${dataCity[0].name.length}
    };
    jsonReturn = jsonReturn.substring(0, jsonReturn.length-1) + "]";
    return jsonReturn;
}


 function countName(values,sort){
    let jsonReturn = "[";
    var json = JSON.parse(values);

    json.sort((a,b) => {           
        return a.localeCompare(b);         
    }).sort((a,b) => { 
        if(sort === 'ASC'){
            return a.length - b.length 
        } else if( sort === 'DESC'){
            return b.length - a.length 
        }
    });
    jsonReturn += ` "${json[0]}" ]`;
    return jsonReturn;
}


async function manipulateCities(){   
    const state="PR";
    const countCity = await countCityByState(state);
   console.log(`\n 1)Quantidade de cidades do estado ${state}: ${countCity} `);
   const data5MostCitiesByState = await printDataCitiesByState('DESC');
   console.log("\n 2)Cinco estados com mais cidades:"+ data5MostCitiesByState);
   const data5LessCitiesByState = await printDataCitiesByState('ASC');
   console.log("\n 3)Cinco estados com menos cidades:"+data5LessCitiesByState);
   const maxNameByState = await countNameByState('DESC');
   console.log("\n 4)Nome de cidade com mais caracteres por Estado:\n"+maxNameByState);
   const minNameByState = await countNameByState('ASC');
   console.log("\n 5)Nome de cidade com menos caracteres por Estado:\n"+minNameByState);
   const maxName = countName(maxNameByState,'DESC');
   console.log("\n 6)Nome de cidade com mais caracteres entre todos os Estado:\n"+maxName);
   const minName = countName(minNameByState,'ASC');
   console.log("\n 7)Nome de cidade com menos caracteres entre todos os Estado:\n"+minName);    
}