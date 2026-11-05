# Third-party notices

## Kanban

The implementation in `src/components/kanban` adapts the component structure,
styling hooks, and drag-and-drop behavior of
[react-kanban-kit](https://github.com/AbbosRakhmonov/react-kanban-kit).

Copyright 2024 Hazem braiek

Licensed under the Apache License, Version 2.0. You may not use this file except
in compliance with the License. You may obtain a copy at
<http://www.apache.org/licenses/LICENSE-2.0>.

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.

A full copy is included in `third-party-licenses/Apache-2.0.txt`.

Vitrea UI modifications: integration into the composite component layer,
TypeScript types, theme tokens, local board/scroll isolation, immutable move
helpers, render memoization, functioning preview slots, empty-column rendering,
per-column drag permissions, configurable CSS properties, examples and tests.

The Kanban component no longer imports or depends on the `react-kanban-kit`
package. Its lower-level drag-and-drop dependencies are the Atlassian Pragmatic
Drag and Drop packages (Apache-2.0), and virtualization uses virtua (MIT).
