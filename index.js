const Twit = require('twit')
const axios = require('axios')
const express = require('express')
const config = require('./config')

const { tweet: _tweet } = require('./functions')

const app = express()
const myuser = 'shouldIDeploy'

const T = new Twit(config)
const stream = T.stream('statuses/filter', { track: `@${myuser}, @shouldideploy` })

const getMessage = async () => {
    const { data } = await axios.get('https://shouldideploy.today/api')
    return data
}

stream.on('tweet', async tweet => {
    const replyTo = tweet.in_reply_to_screen_name
    const text = tweet.text
    const from = tweet.user.screen_name
    const nameID = tweet.id_str

    console.log({
        replyTo,
        text,
        from,
        nameID,
    })

    if(replyTo === myuser) {
        const message = await getMessage()
        const replyTweet = `@${from} ${message.message}`

        const t = {
            status: replyTweet,
            in_reply_to_status_id: nameID,
        }

        _tweet(T, t)
    }
})

app.get('/', (req, res) => {
    res.json(`✅`)
})

app.listen(process.env.PORT || 3000, () => {
    console.log('api is running')
})