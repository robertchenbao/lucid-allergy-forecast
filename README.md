# Lucid Allergy Forecast

**An air quality forecast app for allergic people.**

<img src="https://user-images.githubusercontent.com/30555057/147699972-f9405fca-4fe2-4961-b19f-2f14ee3b4907.png" alt="lucid-air-screenshot"/>

Live: https://lucid-air.herokuapp.com/

## Inspiration

Many people around the world have seasonal allergies. For them, going out on days with high levels of UV index, or pollen level, could be very uncomfortable. The issue could be alleviated by interventions like face masks and medications. However, this would work only if people know the allergens are present beforehand. 

Personally, I have had allergies to pollens and mold for years. So, I wanted to use web technologies to build something that could help people with allergies, providing them with timely information about potential allergy risks.

## What it does

I've built a web app that provides and visualizes allergy risks for any given city. After the user enters a city name, the app will pull the latest forecast for today's allergen levels, such as pollen levels, UV index, and air quality. Moreover, the app will generate a forecast graph for the next 5 days for the given region.

## How I built it

- I used React and Material-UI to power the frontend web application and Python (Django) to run our backend server. 
- On the backend, I used an API from Accuweather to generate the allergen level data. 

## Challenges I ran into

- I ran into several issues while developing the Django backend. Being new to the framework, I was a bit confused by roles for each component (e.g., the differences between `urls.py` files in the project directory vs the app directory). Thus, I made a few mistakes along the way. However, I eventually corrected them by looking up references and documentations.
- Deploying the app was challenging, as it is my first time deploying a web app to heroku. Fortunately, after hours of coding and searching, I was able to set up the app on the heroku server in the end.

## Accomplishments that I am proud of
- I have created a fully functional app that has lots of potential for real-world use.
- I have gained a lot of experience with Django, the Python web framework.
- I designed a visually appealing UI in a very short timeframe!
- I was able to implement some of my stretch goals, such as forecast visualizations and a custom app icon.

## How to get up and running:

- Install python 3 and npm (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Install python dependencies: run `pip install -r requirements.txt`
- Sign up an API token for Accuweather (https://developer.accuweather.com/)
- Create an `.env` file in the project root directory. The file should only contain 1 line: `API_KEY=<your_accuweather_api_key_here>`
- Install React frontend dependencies: In the `frontend` directory, run `npm install`
- Finally, run `npm start`. A local version of the app will be up and running!

## License

MIT License
