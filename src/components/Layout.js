import Footer from './Footer'
import Header from './Header'
function Layout(props){
    
    //const cart = FetchGraph(TOTAL_CART);
    
    return(
        <>
            {<Header/>}
            {props.children}
            {<Footer />}
        </>
    )
}
export default Layout