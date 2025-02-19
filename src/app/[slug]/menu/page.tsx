
type props =  {
    params: Promise<{ slug: string }>;
}

const RestaurantMenuPage = async ({params}:props) => {

    const {slug} = await params;

    return ( <h1>{slug}</h1> );
}
 
export default RestaurantMenuPage;