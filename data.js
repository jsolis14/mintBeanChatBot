const data = {
    'technologies': {
        'javascript': ['Health Nut', 'Flippy Flapp', 'Dotify', 'Aircnc'],
        'python': ['Health Nut', 'Flippy Flapp'],
        'express': ['Aircnc'],
        'flask': ['Health Nut', 'Flippy Flapp'],
        'react': ['Health Nut', 'Flippy Flapp', 'Dotify'],
        'redux': ['Health Nut', 'Flippy Flapp'],
        'postgreSQL': ['Health Nut', 'Flippy Flapp', 'Aircnc']
    },
    'Personal Info': {
        'state': 'Texas',
        'city': 'Fort Worth',
        'age': '23',
        'gender': 'Male',
    },
    'Education': {
        'Texas A&M University': {
            'Location': 'College Station, Texas',
            'Started': 'May 2015',
            'Graduated': 'Dec 2019',
            'Degree': 'Bachelor of Science',
            'Major': 'Industrial Engineering'
        },
        'App Academy': {
            'Location': 'San Francisco, CA',
            'Started': 'Jan 2020',
            'Graduated': 'Jun 2020',
            'Degree': '',
            'Major': 'Web Development'
        }
    },
    'Projects': {
        'Health Nut': {
            'Description': 'Health Nut is an app where users can choose from multiple fitness plans, such as loosing, maintaining, or gaining weight and then track the calories needed to accomplish the fitness plan on a daily basis',
            'Technologies': [
                'React',
                'Redux',
                'Auth0',
                'Material UI',
                'Heroku Deployment (backend)',
                'AWS Deployment (front-end)',
                'Python',
                'JavaScript',
                'Flask',
                'PostgreSQL',
                'SQLAlchemy'],
            'live link': 'https://master.d2v8iaichtof5r.amplifyapp.com/login',
            'repo link': 'https://github.com/jsolis14/HealthNut',

        },
        'Flippy Flapp': {
            'Description': 'Flippy Flapp is a website where private pilots can save and save thier flight plans. Users can choose between two airports on the map and a corresponding set of waypoints will be generated for refueling purposes.',
            'Tehnologies': [
                'React',
                'Redux',
                'Auth0',
                'Material UI',
                'Heroku Deployment (backend)',
                'AWS Deployment (front-end)',
                'Python',
                'JavaScript',
                'Flask',
                'PostgreSQL',
                'SQLAlchemy'
            ],
            'live link': 'https://www.flippyflapp.com/',
            'repo link': 'https://github.com/jballa91/flippyFlapp',
        },
        'Dotify': {
            'Description': 'Dotify is a front end client that uses the Spotify API to preform certain actions on behalf of a spotify user. Currently a user can access thier playlist, create a playlist, play music, and even search for songs and artist. The user can even create a spotify connect device that can be controlled across other spotify platforms.',
            'Tehnologies': [
                'React',
                'OAuth',
                'React Bootstrap',
                'Heroku Deployment',
                'Spotify Api',
            ],
            'live link': 'https://master.d36wh2xec4sh9g.amplifyapp.com/login',
            'repo link': 'https://github.com/jsolis14/Dotify',
        },
        'Aircnc': {
            'Description': 'AirCnC is a spin off of Airbnb where users can rent kitchens and hosts can rent out their kitchens to users.',
            'Tehnologies': ['Heroku Deployment (backend/front-end)',
                'JavaScript',
                'Express',
                'Google Maps API',
                'PostgreSQL',
                'Sequelize',
                'Material Lite'
            ],
            'live link': 'http://www.aircnc.us/',
            'repo link': 'https://github.com/JoshuaCachola/Rework-front',
        }
    }
}

module.exports = data
