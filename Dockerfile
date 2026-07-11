# Ahmed Khalil — Contact Hub
# Lightweight static-site image served by Nginx.

FROM nginx:1.27-alpine

# Nginx's own config with sane defaults for a static SPA-style site
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Site files
COPY index.html style.css script.js favicon.svg profile.jpg Ahmed_Khalil_Abdulameer_CV_V3.pdf /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
