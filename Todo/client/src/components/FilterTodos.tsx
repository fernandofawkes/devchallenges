import React, { useState, useEffect } from 'react';
import styled , {css} from 'styled-components';


enum TodoFilter {
  Active,
  Completed,
  All
}
type Props = {
  todos: ITodo[],
  filterTodos: (state: TodoFilter) => void
}

const Tabs = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
  border-bottom: 1px solid #BDBDBD;
`;

const HiddenInput = styled.input`
  display: none;
`;

interface TabProps {
  readonly active: boolean
}

const Tab = styled.label<TabProps>`
  padding:15px;
  margin: 0 25px;
  position: relative;
  font-family: Montserrat;
  font-size: 14px;
  line-height: 17px;
  color: #333333;
  flex: 1;
  text-align: center;
  ${props => props.active && css`
    &::after {
      content: '';
      position: absolute;
      width:100%;
      height: 4px;
      bottom:0;
      left:0;
      background: #6DA6F2;
      border-radius: 4px 4px 0px 0px;
    }
  `}
`;

const FilterTodos: React.FC<Props> = ({todos, filterTodos}) => {
  const [selectedState, setSelectedState] = useState(TodoFilter.All);

  const handleSelectChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedState(+e.currentTarget.value);
  }

  useEffect(() => {
    filterTodos(selectedState);
  }, [selectedState, filterTodos]);

  return (
    <Tabs>
      <HiddenInput type="radio" name="filter" id="filter-all" defaultChecked value={TodoFilter.All} onChange={handleSelectChange} />
      <Tab htmlFor="filter-all" active={selectedState === TodoFilter.All}>
        All
      </Tab>
      <HiddenInput type="radio" name="filter" id="filter-active" value={TodoFilter.Active} onChange={handleSelectChange} />
      <Tab htmlFor="filter-active" active={selectedState === TodoFilter.Active}>
        Active
      </Tab>
      <HiddenInput type="radio" name="filter" id="filter-completed" value={TodoFilter.Completed} onChange={handleSelectChange} />
      <Tab htmlFor="filter-completed" active={selectedState === TodoFilter.Completed}>
        Completed
      </Tab>
    </Tabs>
  );
}

export {TodoFilter};

export default FilterTodos;