# Use a lightweight base image
FROM alpine:latest

ARG wording="Hello, World!"
# Set the working directory
WORKDIR /app

# Create a simple hello world script
RUN echo '#!/bin/sh' > hello.sh && \
    echo "echo \"$wording\"" >> hello.sh && \
    chmod +x hello.sh

# Set the default command to run our hello world script
CMD ["./hello.sh"]