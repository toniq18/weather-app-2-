// const require = require("express/lib/request");

/* Global Variables */
const apiKey = '&appid=5f4499c3e503f203396f81358371999f';
let baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;

document.getElementById('generate').addEventListener('click', execute)

function execute (e){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getInfo(baseURL, zipCode, apiKey)

    console.log(data)
    data = data.list[0]
    console.log(data)
    ClientSidePost('/add',  {date:data.dt_txt, temp: data.main.temp, content:feelings})
    updateUI();
    
};




//post client side
const ClientSidePost = async (url = '/add', data = {})=>{
    console.log(data)
    const request = await fetch (url , {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try{
        const newData = await response.json();
        console.log(newData);
        return(newData);
    } catch (error){
        console.log("Error", error)
    }
};


//get client side
const getInfo = async (baseURL, zipCode, apiKey) =>{
    const response = await fetch (baseURL + zipCode + apiKey)
    try{
        const data = await response.json();
        return data;
    }
    catch (error){
        console.log("Error", error)
    }
};




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const updateUI = async () => {
    const request = await fetch ('/wthr');
    try{
        const updateAll = await request.json();
        document.getElementById('date').innerHTML= updateAll.date;
        document.getElementById('temp').innerHTML= updateAll.temp;
        document.getElementById('content').innerHTML= updateAll.content;
    } catch (error){
        console.log("ayo bruh there be an error", error);
    }

}
