FROM nginx:latest

COPY ./nginx_conf /etc/nginx/sites-available/MAKHROVYI
RUN ln -s /etc/nginx/sites-available/MAKHROVYI /etc/nginx/sites-enabled
RUN nginx -t
RUN systemctl start nginx.socket
RUN systemctl enable nginx.socket

EXPOSE 80