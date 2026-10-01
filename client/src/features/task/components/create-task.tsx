import { useEffect, useRef, useState } from "react";
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
import { Plus } from "lucide-react";

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

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        nameRef.current?.focus();
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {/* Desktop button */}
        <Button className={'hidden md:block'}>Create task</Button>

        {/* Mobile button */}
        <div className="bg-white w-full h-fit absolute md:hidden bottom-2 right-0 flex items-center justify-end px-2 py-1">
          <Button
            size={'icon'}
            className={'rounded-full size-16 '}
          >
            <Plus className='size-7' />
          </Button>
        </div>
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
              <Button type="submit" disabled={createMutation.isPending} className={'py-5 md:py-4'}>
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