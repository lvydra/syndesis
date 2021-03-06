/*
 * Copyright (C) 2016 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.syndesis.component;

import org.apache.camel.spi.UriEndpoint;
import org.apache.camel.spi.UriPath;

/**
 * Syndesis HTTP component
 */
@UriEndpoint(firstVersion = "0.2.2", scheme = "syndesis-http", extendsScheme = "http4", syntax = "syndesis-http:serviceName",
    lenientProperties = true, title = "Syndesis HTTP", excludeProperties = "httpUri", label = "http", producerOnly = true)
public class HttpEndpoint extends org.apache.camel.component.http4.HttpEndpoint {

    // only exists to cheat and let Camel apt-plugin generate component json schema we need for tooling

    @UriPath(description = "HTTP service to call")
    private String serviceName;

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }
}
