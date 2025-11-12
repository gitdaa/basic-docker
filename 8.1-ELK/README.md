# ELK Stack with Docker Compose

This setup provides a complete ELK Stack (Elasticsearch, Logstash, Kibana) with Filebeat for log collection.

## Services

- **Elasticsearch**: Search and analytics engine (Port: 9200, 9300)
- **Logstash**: Log processing pipeline (Port: 5044, 5000, 9600)
- **Kibana**: Data visualization dashboard (Port: 5601)
- **Filebeat**: Log shipper
- **Sample App**: Nginx app for generating logs (Port: 8080)

## Quick Start

1. Start the stack:

```bash
docker-compose up -d
```

2. Wait for all services to be healthy (especially Elasticsearch)

3. Access Kibana at http://localhost:5601

4. Generate some logs by accessing the sample app at http://localhost:8080

## Configuration Files

- `logstash/config/logstash.yml`: Logstash configuration
- `logstash/pipeline/logstash.conf`: Log processing pipeline
- `kibana/config/kibana.yml`: Kibana configuration
- `filebeat/config/filebeat.yml`: Filebeat configuration

## Creating Index Patterns in Kibana

1. Go to Kibana → Stack Management → Index Patterns
2. Create index pattern: `logstash-*`
3. Select timestamp field: `@timestamp`

## Useful Commands

```bash
# Check service health
docker-compose ps

# View logs
docker-compose logs elasticsearch
docker-compose logs logstash
docker-compose logs kibana

# Scale down
docker-compose down

# Clean up volumes
docker-compose down -v
```

## Memory Requirements

Make sure Docker has at least 4GB of RAM allocated for optimal performance.
