//import fetch from 'fetch-with-proxy';
const url = 'https://www.trendyol.com/en/gw/search/api/search/products?isDynamicRenderingAgent=false&pi=1&pageSize=24&pathModel=men-shoes-x-g2-c114'
function Proxy(){
    const fetchUrl = fetch(url)
    .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          
        },
        (error) => {
            console.log(error)
        })
    return(
        <p>Proxy</p>
    )
}
export default Proxy