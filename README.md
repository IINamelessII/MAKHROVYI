# AnotherOneProject
Service for premises outsourcing, where:

 - Everybody can rent out a premises
 - Everybody can rent a place for different needs
 
## Project features
 - The main goal of the project is providing a platform for renting of EVERYTHING: people can rent anything from the things they need (for example, a washing machine, hairdryer, projector, or even a car) to living quarters, offices or retail spaces.
 - Users can create pages with a detailed description of their objects that will be rented. On these pages, among other things, you can find out the price, the time for which you can rent this object and also the queue for rent.
 - Also, people can leave requests for things they want to rent.
 - Each owner will have a personal page with rental statistics and reviews.
 - Buyer's actions will remain anonymous and will not be displayed anywhere without his consent.
 - For an additional fee it will be possible to advertise a rental object.
 - ... (as the project develops, opportunities will be added and adjusted)


## Tech Stack:

| Purpose | Tech |
| --------|------|
| Web Server | Django, Gunicorn, Nginx |
| REST API | Django REST Framework |
| SQL Database | PostgreSQL |
| Containerization | Docker |
| Task Queue | Celery |
| Task Worker | Redis |
| Frontend client | React.JS |
| Frontend state manager | Redux |
| Layout, Markup | HTML5, CSS3, CSS-modules |

## Stack description

### Front end

#### Front-end frameworks comparison

The leading front-end development technologies are Angular, ReactJS and Vue.js to date. Below are represented pros and cons of each one.

##### Angular

Advantages:
- enhanced RxJS, fast compilation, HTTPClient launcher;
- detailed documentation;
- two-way data binding that minimizes the risks of possible errors;
- MVVM (Model-View-ViewModel) pattern, which allows to work separately in one section of the application using the same data set;
- dependency injection and general modularity.

Disadvantages:
- need to get used to the documentation;
- sophisticated syntax that comes from the first version of Angular;
- migration problems that may occur when moving from an old version to a new one.

##### ReactJS

Advantages:
- syntax simplicity;
- high level of flexibility and maximum responsiveness;
- virtual DOM (Document Object Model) - allows to organize documents into a tree that is best suited for web browsers to analyze various elements of a web application;
- data linking from large to small - a stream of data in which children cannot influence parent data;
- 100% open source JavaScript library that receives many daily updates and improvements according to feedback from developers around the world;
- lightweight, since data that runs on the user side can easily be presented on the server side at the same time;
- migration between versions is usually very simple. Facebook also provides “codemods” to automate much of this process.

Disadvantages:
- long time to master - requires a deep understanding of how to integrate the user interface into the MVC (Model-View-Control) framework.

##### Vue.js

Advantages:
- detailed documentation;
- adaptability - provides a quick transition period from other frameworks to Vue.js in view of its similarities with Angular and React in terms of design and architecture;
- good integration - can be used both for creating single-page applications, as well as for more complex web application interfaces;
- great scaling - helps to develop fairly large reusable templates that can be developed without spending a huge amount of time in view of a simple structure;
- size - can weigh about 20 KB and at the same time maintain its own speed and flexibility, which allows to achieve much higher performance.

Disadvantages:
- lack of resources - still has a pretty small market share compared to React or Angular, the exchange of knowledge within the framework is still being formed;
- risk of excessive flexibility - may have problems integrating into huge projects.

#### Why ReactJS

##### Components for flexibility.
Component-based development enables easy code reuse through app, but also the writing of small features. Or, in the current case, small e-commerce functionalities. This comes in handy once it start scaling.

##### Virtual DOM for performance.
React’s virtual DOM provides a more efficient way of updating the view in a web application. Performance is huge in e-commerce.

##### Vast community for peace of mind.
Any issue has probably already been documented. Also, the ecosystem has spawned dozens of excellent dev tools to optimize React development.

##### Popularity for lightweight development.
A common E-commerce website usually comprises a plethora of forms to fill, complex filters, elements, which interact with different APIs, maps, etc. ReactJS comes with a whole bunch of ready-made modules for all occasions, not mentioning that it’s easy to test and scale.
