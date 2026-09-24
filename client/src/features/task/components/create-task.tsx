import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useTask from "../task.hook";

const CreateTask = () => {
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const { createMutation } = useTask();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value.trim();

    if (!name) return;

    createMutation.mutate(name, {
      onSuccess: () => {
        setOpen(false);
        nameRef.current!.value = "";
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Create task</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  ref={nameRef}
                  placeholder="eg. do homework"
                />
              </Field>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creating..." : "Create task"}
              </Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;