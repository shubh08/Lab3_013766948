
const searchDishes = (req, res, kafka) => {
    console.log('Request Body', req.body);
    const { id,searchTerm } = req.body;
    console.log('Search Term is ', searchTerm)

    kafka.make_request('searchDishes',req.body, function(err,rest){
        if(err){
            res.send("error");
        }
        else{
            console.log('result data profile', rest)

            console.log('Result Section Data', rest)
    
    
            if (rest.length==0) {
                res.end(JSON.stringify({
                    status: "success",
                    searchData: []
                }));
            }
            else {
                res.end(JSON.stringify({
                    status: "success",
                    searchData: rest
                }));
            }
        }
    })

}


module.exports = {
    searchDishes: searchDishes
};