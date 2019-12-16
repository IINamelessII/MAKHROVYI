# AnotherOneProject
Service for premises outsourcing, where:

 - Everybody can rent out a premises
 - Everybody can rent a place for different needs
 
## Project features
 - The main goal of the project is providing a platform for ***renting of EVERYTHING***: people can rent anything from the things they need (for example, *a washing machine, hairdryer, projector, or even a car*) to *living quarters, offices or retail spaces*.
 - Users can **create pages** with a detailed description of their objects that will be rented. On these pages, among other things, you can find out the price, the time for which you can rent this object and also the queue for rent.
 - Also, people can **leave requests** for things they want to rent.
 - Each owner will have a **personal page** with rental statistics and reviews.
 - Buyer's actions will remain **anonymous** and will not be displayed anywhere without his consent.
 - For an additional fee it will be possible to **advertise** a rental object.
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

#### State management frameworks

##### MobX
MobX is a battle tested library that makes state management simple and scalable by transparently applying functional reactive programming (TFRP). The philosophy behind MobX is very simple:

_Anything that can be derived from the application state, should be derived. Automatically._

It makes use of such popular design patterns as Observable and Observer and utilizes these in order to create UIs which truly represent data.

Advantages:
- easy to use - it only takes a few minutes to get used to it;
- utilizes reactive programming;
- suitable for small- to middle-sized apps.

Disadvantages:
- impure - encourages state mutations which can lead to bugs;
- not scalable.

##### Redux
Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.

Advantages:
- pure - encourages immutability;
- centralized data store - data is kept in one place and is not mixed with other layers;
- easy to maintain - single-responsibility layering model keeps business logic separated and makes code clean and shiny;
- lightweight (only 2KB);
- large community.

Disadvantages:
- needs a lot of boilerplate.

#### Why Redux

##### Logic separation
The major benefit of Redux is to add direction to decouple “what happened” from “how things change”.

##### Predictable state
In Redux, the state is always predictable. If the same state and action are passed to a reducer, the same result is always produced as reducers are pure functions. The state is also immutable and is never changed. This makes it possible to implement arduous tasks like infinite undo and redo.

##### Maintainability
Redux is strict about how code should be organized so it makes it easier for someone with knowledge of Redux to understand the structure of any Redux application. This generally makes it easier to maintain.

##### Ease of testing
It is easy to test Redux apps as functions used to change the state of pure functions.


### Back end

#### Back-end frameworks comparison

Nowadays you can choose among of tons of web-frameworks in search of your development tool. We decided to prefer Python-based one because of it's simplify and correlation to our current experience. Especially, in case when backend developer currently works (as Python Developer, btw).

There are a lot of python backend so-called frameworks. But it should be meantioned that you really have to choose between 2 of them(Really, have you ever seen usage of another Python web framework within big, high load project?):

##### Django

Features:
- It was designed to help developers take applications from beginning to end as quickly as possible
- It includes dozens of extras you can use to handle common Web development tasks. Django takes care of user authentication, content administration, site maps, RSS feeds, and many more tasks — right out of the box
-  It provides security very effectively and helps developers avoid many common security mistakes, such as SQL injection, cross-site scripting, cross-site request forgery, and clickjacking. Its user authentication system provides a secure way to manage user accounts and passwords
- Some of the busiest sites on the planet use Django’s ability to quickly and flexibly scale to meet the heaviest traffic demands

##### Flask

Features:
- Has a lightweight and modular design, so it easy to transform it to the web framework you need with a few extensions without weighing it down
- ORM-agnostic: you can plug in your favourite ORM e.g. SQLAlchemy
-  Built-in development server and fast debugger
- Flask documentation is comprehensive, full of examples and well structured. You can even try out some sample application to really get a feel of Flask
- RESTful request dispatching
- Support for secure cookies (client side sessions)
- The configuration is even more flexible than that of Django, giving you plenty of solution for every production need


#### Why Django

##### It's fast and simple
One of Django’s main goals is to simplify work for developers. To do that, the Django framework uses:
- The principles of rapid development, which means developers can do more than one iteration at a time without starting the whole schedule from scratch
- DRY philosophy — Don’t Repeat Yourself — which means developers can reuse existing code and focus on the unique one

As a result, it takes a lot less time to get the project to market

##### It's secure
Security is also a high priority for Django. It has one of the best out-of-the-box security systems out there, and it helps developers avoid common security issues, including:
- clickjacking,
- cross-site scripting,and
- SQL injection.

Django promptly releases new security patches. It’s usually the first one to respond to vulnerabilities and alert other frameworks.

##### It's easy to extend and scale
It’s fully loaded with extras and scalable, so you can make applications that handle heavy traffic and large volumes of information

##### Flexible databases configuration
It works with most major databases and allows using a database that is more suitable in a particular project, or even multiple databases at the same time
