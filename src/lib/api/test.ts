//Ekki hugsað sem raunverulegt test, bara skrifað til að prófa að sækja gögn frá bakenda
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://vef2-hopverk1-wyh0.onrender.com';

/*
async function testGET(){
    try{
        const response = await fetch(`${API_BASE_URL}/`);
        if(!response.ok){
            throw new Error(`HTTP VILLA!!: ${response.status}`);
        }
        const data = await response.json();
        console.log('Gögn sótt: ', data);
    } catch(error){
        console.error('Villa við að sækja gögn frá bakenda: ', error);
    }
}

//testGET();
*/

/*async function getItemsTest(){
    try{
        const response = await fetch(`${API_BASE_URL}/items`);
        if(!response.ok){
            throw new Error(`HTTP VILLA!!: ${response.status}`);
        }
        const data = await response.json();
        console.log('Tókst að sækja gögn: ', data);
    } catch(error){
        console.error('Villa við að sækja gögn frá bakenda: ', error);
    }
}

getItemsTest();
*/

async function getSpecificItemTest(item: string){
    try{
        const response = await fetch(`${API_BASE_URL}/items/${item}`);
        if(!response.ok){
            throw new Error(`HTTP VILLA!!: ${response.status}`);
        }
        const data = await response.json();
        console.log('Tókst að sækja gögn: ', data);
    } catch(error){
        console.error('Villa við að sækja gögn frá bakenda: ', error);
    }
}

getSpecificItemTest('1001');