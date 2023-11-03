apiVersion: v1
kind: Service
metadata:
  name: my-nginx-ingress-lb
  namespace: default
spec:
  type: LoadBalancer
  loadBalancerIP: ${load_balancer_ip}
  selector:
    app.kubernetes.io/instance: nginx-ingress
    app.kubernetes.io/name: ingress-nginx
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 80
    - name: https
      protocol: TCP
      port: 443
      targetPort: 443
