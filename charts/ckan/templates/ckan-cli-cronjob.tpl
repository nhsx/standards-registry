{{- $top := . }}
{{- if hasKey .Values "cronjobs" }}
{{- range .Values.cronjobs }}
---
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: {{ .name }}
spec:
  schedule: "{{ .schedule }}"
  successfulJobsHistoryLimit: 0
  failedJobsHistoryLimit: 2
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: {{ .name }}
            image: {{ .image }}
            command: {{ .command }}
            args:
            {{- range .args }}
            - {{ . }}
            {{- end }}
            {{- if hasKey . "env" }}
            env:
            - name: CKAN_SYSADMIN_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: ckancredentials
                  key: sysadminPassword
            - name: CKAN__SITE_TITLE
              value: {{ .Values.ckan.siteTitle }}
            - name: PSQL_MASTER
              value: {{ .Values.ckan.psql.masterUser }}
            - name: PSQL_PASSWD
              valueFrom:
                secretKeyRef:
                  name: ckancredentials
                  key: psqlMasterPassword
            - name: CKAN_SQLALCHEMY_URL
              valueFrom:
                secretKeyRef:
                  name: ckancredentials
                  key: ckanSqlAlchemyUrl
            - name: CKAN_DATASTORE_WRITE_URL
              valueFrom:
                secretKeyRef:
                  name: ckancredentials
                  key: ckanDatastoreWriteUrl
            - name: CKAN_DATASTORE_READ_URL
              valueFrom:
                secretKeyRef:
                  name: ckancredentials
                  key: ckanDatastoreReadUrl
            - name: CKAN_SOLR_URL
              value: {{ .Values.ckan.solr }}
            - name: CKAN__DATAPUSHER__URL
              value: {{ .Values.ckan.datapusherUrl }}
            {{- range .env }}
            - name: {{ .name }}
              value: {{ .value }}
            {{- end }}

            {{- end }}
          {{- if hasKey $top.Values "imagePullSecret" }}
          imagePullSecrets:
          - name: {{ $top.Values.imagePullSecret }}
          {{- end }}
          restartPolicy: OnFailure
{{- end }}
{{- end }}
