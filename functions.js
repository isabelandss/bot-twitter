const tweet = (T, tweet) => {
    T.post('statuses/update', tweet, (err, data, response) => {
        if(err) {
            console.log('something went wrong: ', err)
        }
    })
}

module.exports = {
    tweet
}