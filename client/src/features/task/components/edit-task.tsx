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
import { Pen } from "lucide-react";

type Prop = {
  id: string
  name: string
}

const EditTask = ({ id, name }: Prop) => {
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const { editMutation } = useTask()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value.trim();

    if (!name) return;
    editMutation.mutate({ id, name }, {
      onSuccess: () => {
        setOpen(false);
        nameRef.current!.value = "";
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={'icon'} variant={'secondary'}><Pen className="size-4" /></Button>
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
                  defaultValue={name}
                  placeholder="eg. do homework"
                />
              </Field>

              <Button type="submit" disabled={editMutation.isPending}> {editMutation.isPending ? "updating..." : "Update task"}
              </Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTask