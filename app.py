import feedparser
from flask import Flask, render_template, jsonify, request
import processor

app = Flask(__name__, template_folder='templates')

app.config['SECRET_KEY'] = 'enter-a-very-secretive-key-3479373'

FEED_URL = 'https://avatar-the-last-airbender.tumblr.com/rss'
font_url='https://fonts.googleapis.com/css2?family=Questrial&display=swap'

@app.route('/', methods=["GET", "POST"])
def welcome():
    return render_template('welcome.html', font_url=font_url)

@app.route('/palace', methods=["GET", "POST"])
def index():
    return render_template('index.html', font_url=font_url)

@app.route('/ozai', methods=["GET", "POST"])
def ozaiindex():
    return render_template('ozai.html', font_url=font_url)

@app.route('/aang', methods=["GET", "POST"])
def aangindex():
    return render_template('aang.html', **locals())  

@app.route('/zuko', methods=["GET", "POST"])
def zukoindex(): 
    feed = feedparser.parse(FEED_URL)

    # for x in range(10):
    info = feed['entries']

    # article = feed['entries'][0]
    # return """
    # <body>
    #     <h1>Fire Nation Citizens' Bulletin Board</h1>
    #     <p>{1}</p><br/>
    #     </body>
    #     """.format(article.get("title"), article.get("description"))
    return render_template('zuko.html', info=info, font_url=font_url)

@app.route('/iroh', methods=["GET", "POST"])
def irohindex():
    return render_template('iroh.html', font_url=font_url)


@app.route('/chatbot', methods=["GET", "POST"])
def chatbotResponse():

    if request.method == 'POST':
        the_question = request.form['question']

        response = processor.chatbot_response(the_question)

    return jsonify({"response": response })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8888', debug=True)