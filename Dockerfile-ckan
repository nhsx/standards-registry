###################
### Extensions ####
###################
FROM ghcr.io/keitaroinc/ckan:2.9.4 as extbuild

# Switch to the root user
USER root

# Install any system packages necessary to build extensions
# Make sure we install python 3.8, cause CKAN is not compatible with 3.9
RUN apk add --no-cache --repository=http://dl-cdn.alpinelinux.org/alpine/v3.13/main \
        python3-dev=3.8.10-r0 

# Fetch and build the custom CKAN extensions
RUN pip wheel --wheel-dir=/wheels git+https://github.com/Marvell-Consulting/ckanext-extrafields@main#egg=ckanext-extrafields

############
### MAIN ###
############
FROM ghcr.io/keitaroinc/ckan:2.9.4

# Add the custom extensions to the plugins list
ENV CKAN__PLUGINS envvars image_view text_view recline_view datastore datapusher extrafields

# Switch to the root user
USER root

COPY --from=extbuild /wheels /srv/app/ext_wheels

# Install and enable the custom extensions
RUN pip install --no-index --find-links=/srv/app/ext_wheels ckanext-extrafields && \
    ckan config-tool ${APP_DIR}/production.ini "ckan.plugins = ${CKAN__PLUGINS}" && \
    chown -R ckan:ckan /srv/app

# Remove wheels
RUN rm -rf /srv/app/ext_wheels

# Switch to the ckan user
USER ckan
