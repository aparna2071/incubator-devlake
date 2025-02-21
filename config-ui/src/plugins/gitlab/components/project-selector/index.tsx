/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React from 'react';
import { Checkbox } from '@blueprintjs/core';

import { MultiSelector } from '@/components';

import type { ScopeItemType } from '../../types';

import type { UseProjectSelectorProps } from './use-project-selector';
import { useProjectSelector } from './use-project-selector';
import * as S from './styled';

interface Props extends UseProjectSelectorProps {
  disabledItems: ScopeItemType[];
  selectedItems: ScopeItemType[];
  onChangeItems: (selectedItems: ScopeItemType[]) => void;
}

export const ProjectSelector = ({ connectionId, disabledItems, selectedItems, onChangeItems }: Props) => {
  const { loading, items, membership, onSearch, onChangeMembership } = useProjectSelector({
    connectionId,
  });

  return (
    <S.Container>
      <MultiSelector
        placeholder="Select Projects..."
        items={items}
        getKey={(it) => `${it.gitlabId}`}
        getName={(it) => it.name}
        disabledItems={disabledItems}
        selectedItems={selectedItems}
        onChangeItems={onChangeItems}
        loading={loading}
        noResult="No Projects Available."
        onQueryChange={onSearch}
      />
      <Checkbox
        className="checkbox"
        label="Only search my repositories"
        checked={membership}
        onChange={onChangeMembership}
      />
    </S.Container>
  );
};
