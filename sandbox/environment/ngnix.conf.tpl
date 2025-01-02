# nginx.conf
worker_processes 1;

events {
    worker_connections 1024;
}

http {

    server {
        listen 80;

        server_name $AUTH_WEB_PROXY_HOST;

        location /api/ {
            proxy_pass http://host.docker.internal:$AUTH_WEB_EXPOSE_PORT;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # For OAuth2 cookies
            proxy_cookie_path / "/; Secure; HttpOnly; SameSite=None";
        }


        location /oauth/ {
            proxy_pass http://host.docker.internal:$AUTH_WEB_EXPOSE_PORT;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # For OAuth2 cookies
            proxy_cookie_path / "/; Secure; HttpOnly; SameSite=None";
        }

        location / {
            proxy_pass http://host.docker.internal:$OAUTH_VIEW_WEB_EXPOSE_PORT; # React app port on host
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

    }

}