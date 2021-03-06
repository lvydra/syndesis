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
package io.syndesis.model.integration;

import java.io.Serializable;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import io.syndesis.model.Kind;
import io.syndesis.model.WithId;
import io.syndesis.model.environment.Environment;
import org.immutables.value.Value;

@Value.Immutable
@JsonDeserialize(builder = IntegrationRuntime.Builder.class)
@SuppressWarnings("immutables")
public interface IntegrationRuntime extends WithId<IntegrationRuntime>, Serializable {

    @Override
    default Kind getKind() {
        return Kind.IntegrationRuntime;
    }

    String getState();

    Integration getIntegration();

    Environment getEnvironment();

    class Builder extends ImmutableIntegrationRuntime.Builder {
        // allow access to ImmutableIntegrationRuntime.Builder
    }

}
