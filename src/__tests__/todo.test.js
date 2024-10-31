import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { act } from "react";

const getAlertMock = () => {
    return vi.fn(() => true);
}

describe("initial render related tests", () => {

    afterEach(()=>{
        vi.resetAllMocks();
        vi.unstubAllGlobals();
        cleanup();
    });

    it("should render all relevant elements, namely search query input, dropdown to select task status, etc", () => {
        render(<App />);
        
        const searchQueryEl = screen.getByTestId("search-query-input");
        expect(searchQueryEl).toBeInTheDocument();

        const dropdownEl = screen.getByTestId("status-dropdown");
        expect(dropdownEl).toBeInTheDocument();
        
        const addTaskCtaEl = screen.getByTestId("add-task-cta");
        expect(addTaskCtaEl).toBeInTheDocument();

        const taskDescInputEl = screen.getByTestId("task-desc-input");
        expect(taskDescInputEl).toBeInTheDocument();
    });
    
    it("should render some tasks, if data exists in localStorage from previous sessions", () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'tasksList') return '[{"taskId":8,"description":"get good night sleep","status":2},{"taskId":7,"description":"take mom to hospital","status":2},{"taskId":6,"description":"eat veggies","status":2},{"taskId":5,"description":"Go for run","status":2},{"taskId":4,"description":"Drink milk","status":2},{"taskId":3,"description":"Do homework","status":1},{"taskId":2,"description":"eat food","status":1},{"taskId":1,"description":"Go to movie","status":2}]';
            return null;
        });

        render(<App />);

        const taskElArr = screen.getAllByTestId("task-el-desc");
        expect(taskElArr.length).toBeGreaterThan(0);

    });

    it("should render zeroth state tasks UI, if no data exists in localStorage from previous sessions", () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            return null;
        });

        render(<App />);

        const taskZeroStateEl = screen.getByTestId("task-zero-state");
        expect(taskZeroStateEl).toBeInTheDocument();
    });
});

describe('user interaction - happy flow', () => { 

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(()=>{
        vi.resetAllMocks();
        vi.unstubAllGlobals();
        cleanup();
    });

    it("should add a task with same description as provided in input field when 'Add Task' CTA is clicked", async () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'tasksList') return '[{"taskId":8,"description":"get good night sleep","status":2},{"taskId":7,"description":"take mom to hospital","status":2},{"taskId":6,"description":"eat veggies","status":2},{"taskId":5,"description":"Go for run","status":2},{"taskId":4,"description":"Drink milk","status":2},{"taskId":3,"description":"Do homework","status":1},{"taskId":2,"description":"eat food","status":1},{"taskId":1,"description":"Go to movie","status":2}]';
            return null;
        });

        render(<App />);

        const dummyText = "Wake up early in morning tomorrow";
        const taskDescInputEl = screen.getByTestId("task-desc-input");
        await act(async () => {
            fireEvent.change(taskDescInputEl, { target: { value: dummyText }});
            fireEvent.keyDown(taskDescInputEl, { key: "Enter" });
        });

        // task has appeared at the top
        const taskElDescArr = screen.getAllByTestId("task-el-desc");
        expect(taskElDescArr[0].innerHTML).toBe(dummyText);

        // input element has been cleared and is empty now
        expect(taskDescInputEl.value).toBe("");
    });
    
    it("should toggle the status of a task each time it is clicked", async () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'tasksList') return '[{"taskId":8,"description":"get good night sleep","status":2},{"taskId":7,"description":"take mom to hospital","status":2},{"taskId":6,"description":"eat veggies","status":2},{"taskId":5,"description":"Go for run","status":2},{"taskId":4,"description":"Drink milk","status":2},{"taskId":3,"description":"Do homework","status":1},{"taskId":2,"description":"eat food","status":1},{"taskId":1,"description":"Go to movie","status":2}]';
            return null;
        });

        render(<App />);

        const dummyText = "Wake up early in morning tomorrow";
        const taskDescInputEl = screen.getByTestId("task-desc-input");
        await act(async () => {
            fireEvent.change(taskDescInputEl, { target: { value: dummyText }});
            fireEvent.keyDown(taskDescInputEl, { key: "Enter" });
        });

        let taskElStatusArr = screen.getAllByTestId("task-el-status");
        expect(taskElStatusArr[0].getAttribute("data-status")).toBe("2");
        
        await act(async () => {
            fireEvent.click(taskElStatusArr[0]);
        });

        let taskElDescArr = screen.getAllByTestId("task-el-desc");
        let targetIdx = taskElDescArr.findIndex(el => el.innerHTML === dummyText);
        
        taskElStatusArr = screen.getAllByTestId("task-el-status");
        expect(taskElStatusArr[targetIdx].getAttribute("data-status")).toBe("1");

        await act(async () => {
            fireEvent.click(taskElStatusArr[targetIdx]);
        });

        taskElDescArr = screen.getAllByTestId("task-el-desc");
        targetIdx = taskElDescArr.findIndex(el => el.innerHTML === dummyText);
        
        taskElStatusArr = screen.getAllByTestId("task-el-status");
        expect(taskElStatusArr[targetIdx].getAttribute("data-status")).toBe("2");
    });
    
    it("should render undo UI for first 3 secs on delete task action and then task should be removed from the screen", async () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'tasksList') return '[{"taskId":8,"description":"get good night sleep","status":2},{"taskId":7,"description":"take mom to hospital","status":2},{"taskId":6,"description":"eat veggies","status":2},{"taskId":5,"description":"Go for run","status":2},{"taskId":4,"description":"Drink milk","status":2},{"taskId":3,"description":"Do homework","status":1},{"taskId":2,"description":"eat food","status":1},{"taskId":1,"description":"Go to movie","status":2}]';
            return null;
        });

        render(<App />);

        let taskElDeleteArr = screen.getAllByTestId("task-el-delete");
        await act(async () => {
            fireEvent.click(taskElDeleteArr[0]);
        });
        
        let undoTaskElArr = screen.getAllByText("Undo");
        expect(undoTaskElArr.length).toBe(1);

        let countBeforeDeletion = screen.getAllByTestId("task-el-parent").length;
        
        await act(async () => {
            vi.advanceTimersByTime(3000);
        });

        let parentElArr = screen.getAllByTestId("task-el-parent");
        expect(parentElArr.length).toBe(countBeforeDeletion-1);
    });

    it("should render undo UI for first 3 secs on delete task action and on clicking undo, total task count should come back to initial count", async () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'tasksList') return '[{"taskId":8,"description":"get good night sleep","status":2},{"taskId":7,"description":"take mom to hospital","status":2},{"taskId":6,"description":"eat veggies","status":2},{"taskId":5,"description":"Go for run","status":2},{"taskId":4,"description":"Drink milk","status":2},{"taskId":3,"description":"Do homework","status":1},{"taskId":2,"description":"eat food","status":1},{"taskId":1,"description":"Go to movie","status":2}]';
            return null;
        });

        render(<App />);

        let countBeforeDeletion = screen.getAllByTestId("task-el-parent").length;

        let taskElDeleteArr = screen.getAllByTestId("task-el-delete");
        await act(async () => {
            fireEvent.click(taskElDeleteArr[0]);
        });

        let undoTaskElArr = screen.getAllByText("Undo");
        expect(undoTaskElArr.length).toBe(1);

        await act(async () => {
            fireEvent.click(undoTaskElArr[0]);
        });
        
        await act(async () => {
            vi.advanceTimersByTime(3000);
        });

        let countAfter3Secs = screen.getAllByTestId("task-el-parent").length;
        expect(countAfter3Secs).toBe(countBeforeDeletion);
    });

    it("should filter out all pending tasks, when filter for 'completed' tasks is selected", async () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'tasksList') return '[{"taskId":8,"description":"get good night sleep","status":2},{"taskId":7,"description":"take mom to hospital","status":2},{"taskId":6,"description":"eat veggies","status":2},{"taskId":5,"description":"Go for run","status":2},{"taskId":4,"description":"Drink milk","status":2},{"taskId":3,"description":"Do homework","status":1},{"taskId":2,"description":"eat food","status":1},{"taskId":1,"description":"Go to movie","status":2}]';
            return null;
        });

        render(<App />);

        let taskElStatusArr = screen.getAllByTestId("task-el-status");
        let oldCountOfPendingTasks = taskElStatusArr.reduce((acc, el) => {
            return el.getAttribute("data-status") === "2" ? acc + 1 : acc;
        }, 0);
        expect(oldCountOfPendingTasks).toBeGreaterThan(0);

        const dropdownEl = screen.getByTestId("status-dropdown");
        await act(async () => {
            fireEvent.change(dropdownEl, { target: { value: 2 }});
        });

        let updateTaskElStatusArr = screen.getAllByTestId("task-el-status");
        let newCountOfPendingTasks = updateTaskElStatusArr.reduce((acc, el) => {
            return el.getAttribute("data-status") === "2" ? acc + 1 : acc;
        }, 0);
        expect(newCountOfPendingTasks).toBe(0);
    });

    it("should filter out tasks with matching search query input", async () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'tasksList') return '[{"taskId":8,"description":"get good night sleep","status":2},{"taskId":7,"description":"take mom to hospital","status":2},{"taskId":6,"description":"eat veggies","status":2},{"taskId":5,"description":"Go for run","status":2},{"taskId":4,"description":"Drink milk","status":2},{"taskId":3,"description":"Do homework","status":1},{"taskId":2,"description":"eat food","status":1},{"taskId":1,"description":"Go to movie","status":2}]';
            return null;
        });

        render(<App />);

        let taskElDescArr = screen.getAllByTestId("task-el-desc");
        expect(taskElDescArr.length).toBe(8);

        const searchQueryEl = screen.getByTestId("search-query-input");
        await act(async () => {
            fireEvent.change(searchQueryEl, { target: { value: "go" }});
            vi.advanceTimersByTime(1000);
        });
        
        let updatedElDescArr = screen.getAllByTestId("task-el-desc");
        expect(updatedElDescArr.length).toBe(3);
    });

});