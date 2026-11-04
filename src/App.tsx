import { Calendar, TimePicker } from './ui/calendar';
import {
  Checkbox,
  HtmlEditor,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  ReactSelect,
  Select,
  SelectTrigger,
  SelectValue,
  VirtualizedSelectContent,
} from './ui/form';

/**
 * Root component of the application.
 * Currently renders the TimePicker component for demonstration or testing purposes.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <div className={'mx-auto max-w-2xl space-y-6'}>
      <Label className="flex items-center space-x-3">
        <Checkbox />
        <div className="space-y-1 leading-none">
          <Label>Checkbox</Label>
        </div>
      </Label>
      <Label className="flex items-center space-x-3">
        <Checkbox />
        <div className="space-y-1 leading-none">
          <Label>Checkbox</Label>
        </div>
      </Label>
      <Label>
        <RadioGroup>
          <Label>
            <RadioGroupItem value={'1'} />
            {123}
          </Label>
          <Label>
            <RadioGroupItem value={'2'} />
            {1234}
          </Label>
          <Label>
            <RadioGroupItem value={'3'} />
            {12345}
          </Label>
        </RadioGroup>
      </Label>
      <Input placeholder={'123'} />
      <ReactSelect
        placeholder={'123'}
        options={[
          {
            label: '1',
            value: '1',
          },
          {
            label: '2',
            value: '2',
          },
          {
            label: '3',
            value: '3',
          },
          {
            label: '4',
            value: '5',
          },
        ]}
      />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={'123'} />
        </SelectTrigger>
        <VirtualizedSelectContent
          options={[
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '2',
            },
            {
              label: '3',
              value: '3',
            },
            {
              label: '4',
              value: '5',
            },
          ]}
        />
      </Select>
      <TimePicker error={true} />
      <div>
        <Calendar mode={'single'} />
      </div>
      <div>
        <HtmlEditor placeholder={'Test text'} />
      </div>
    </div>
  );
}

export default App;
