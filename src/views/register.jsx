import { getAll } from '../services/groups';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import CustomDropdown from '../components/customDropdown';
import { Panel } from 'primereact/panel';

const laboratories = [
  {
    key: 1,
    label: 'Laboratorio 1',
    data: 'lab1',
    icon: 'pi pi-server',
  },
  {
    key: 2,
    label: 'Laboratorio 2',
    data: 'lab2',
    icon: 'pi pi-server',
  },
  {
    key: 3,
    label: 'Laboratorio 3',
    data: 'lab3',
    icon: 'pi pi-server',
  },
];

const pcs = [
  {
    key: 1,
    label: 'PC 1',
    data: 'PC 1',
    icon: 'pi pi-desktop',
  },
  {
    key: 2,
    label: 'PC 2',
    data: 'PC 2',
    icon: 'pi pi-desktop',
  },
  {
    key: 3,
    label: 'PC 3',
    data: 'PC 3',
    icon: 'pi pi-desktop',

  },
];


export default function Register() {
  const toast = useRef(null);
  let emptyRegister = {
    id: null,
    laboratory: null,
    subject: null,
    pc: null,
    student: null,
    note: 0,
  };

  const [groups, setGroups] = useState(null);
  const [subjects, setSubjects] = useState(null);

  const [selectedLaboratory, setSelectedLaboratory] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedPC, setSelectedPC] = useState(null);
  const [student, setStudent] = useState('');

  const [register, setRegister] = useState(emptyRegister);






  const [registers, setRegisters] = useState([]);
  const [selectedRegisters, setSelectedRegisters] = useState(null);
  const [registerDialog, setRegisterDialog] = useState(false);
  const [deleteRegisterDialog, setDeleteRegisterDialog] = useState(false);
  const [deleteRegistersDialog, setDeleteRegistersDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getAll().then((response) => {
      setGroups(response);
    });
  }, []);

  useEffect(() => {
    if (groups) {
      const listSubjects = groups.map((group) => ({
        key: group.subject,
        label: group.subject,
        icon: 'pi pi-book',
        data: group.subject.key,
      }));
      setSubjects(listSubjects);
    }
  }, [groups]);

  const clearForm = () => {
    setSelectedLaboratory(null);
    setSelectedSubject(null);
    setSelectedPC(null);
    setStudent('');
  }

  const searchStudent = () =>{
    const group = groups.find((group) => group.subject === selectedSubject.key);
    const std = group.students.find((s) => s.no_ctrl == student);
    return std;
  }

  const showToast = (type, message) => {
    toast.current.show({ severity: `${type}`, summary: `${type}`, detail: `${message}`, life: 3000 });
  }

  const getErrorsInForm = () => {
    const errors = [];

    if (selectedLaboratory === null)
      errors.push('Selecciona un laboratorio')
    if (selectedSubject === null)
      errors.push('Selecciona una materia')
    else {
      const std =searchStudent();
      if (!std)
        errors.push('El alumno no existe o no esta asiganado a este curso')
      else
        setRegister(std)
    }
    if (selectedPC === null)
      errors.push('Selecciona una computadora')
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = getErrorsInForm()
    if (errors.length > 0) {
      errors.forEach(error => {
        showToast('error', error);
      });
    } else {
      const std =searchStudent();
      const register = {
        ...std,
        key: 0,
        pc: selectedPC,
        subject: selectedSubject,
        laboratory: selectedLaboratory,
        note: 0
      };
      saveRegister(register)
      clearForm()
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editRegister(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteRegister(rowData)}
        />
      </React.Fragment>
    );
  };

  const hideDialog = () => {
    setSubmitted(false);
    setRegisterDialog(false);
    clearForm();
  };

  const hideDeleteRegisterDialog = () => {
    setDeleteRegisterDialog(false);
  };

  const hideDeleteRegistersDialog = () => {
    setDeleteRegistersDialog(false);
  };

  const saveRegister = (register) => {
    let updatedRegisters = [...registers];
    register.key = Date.now()
    updatedRegisters.push(register);
    showToast('success', 'Se creo un nuevo registro');
    setRegisters(updatedRegisters);
    setRegisterDialog(false);
  };
  const updateRegister = () => {
    setSubmitted(true);
    const std = searchStudent();

    if(std){ 
      let updatedRegisters = [...registers];
      std.laboratory = selectedLaboratory;
      std.pc = selectedPC
     std.subject = selectedSubject
      std.key = register.key;
    
      const index = updatedRegisters.findIndex((reg) => reg.key === std.key);
      updatedRegisters[index] = std;
      showToast('success', 'Se actualizo el registro de forma exitosa');
      setRegisters(updatedRegisters);
      setRegister(emptyRegister);
     setRegisterDialog(false);
      clearForm()
    }else{
      showToast( 'error','El alumno no existe o no esta asiganado a este curso');
    }
  };

  //
  const editRegister = (register) => {
    setSelectedLaboratory(register.laboratory)
    setSelectedPC(register.pc)
    setStudent(register.no_ctrl)
    setSelectedSubject(register.subject)
    setRegister(register)
    setRegisterDialog(true);
  };

  const confirmDeleteRegister = (register) => {
    setRegister(register);
    setDeleteRegisterDialog(true);
  };

  const deleteRegister = () => {
    let updatedRegisters = [...registers];
   const filteredRegisters = updatedRegisters.filter((reg) => reg.key !== register.key)
    setRegisters(filteredRegisters);
    setDeleteRegisterDialog(false);
    setRegister(emptyRegister);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Register Deleted',
      life: 3000,
    });
  };

  const confirmDeleteSelected = () => {
    setDeleteRegistersDialog(true);
  };

  const deleteSelectedRegisters = () => {
    let updatedRegisters = registers.filter((val) => !selectedRegisters.includes(val));

    setRegisters(updatedRegisters);
    setDeleteRegistersDialog(false);
    setSelectedRegisters(null);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Registers Deleted',
      life: 3000,
    });
  };

  const registerDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={updateRegister} />
    </React.Fragment>
  );

  const deleteRegisterDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteRegisterDialog} />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteRegister}
      />
    </React.Fragment>
  );

  const deleteRegistersDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteRegistersDialog} />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedRegisters}
      />
    </React.Fragment>
  );

  return (
    <>
      <Toast ref={toast} />

      <Panel header="CRUD - Laboratorio">
        <form method="post" onSubmit={handleSubmit}>

          <CustomDropdown
            title="Laboratorio: "
            options={laboratories}
            value={selectedLaboratory}
            onChange={(e) => setSelectedLaboratory(e.value)}
            placeholder="Selecciona un laboratorio" />

          <CustomDropdown
            title="Materia: "
            options={subjects}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.value)}
            placeholder="Selecciona una materia" />

          <CustomDropdown
            title="Equipo: "
            options={pcs}
            value={selectedPC}
            onChange={(e) => setSelectedPC(e.value)}
            placeholder="Selecciona una PC" />

          <div className='input-container'>
            <label className='input-label'>Estudiante: </label>
            <InputText className="input" value={student} onChange={(e) => setStudent(e.target.value)} />
          </div>

          <div className='button-container'>
            <button type="button" className='button-clean' onClick={clearForm}>Limpiar</button>
            <button type="submit" className="button-submit">Registrar</button>
          </div>
        </form>
      </Panel>

      <div className="card">
      <div>
      <label>Accines en lote:</label>
        <select> asd</select>
        <button type='button'>Aplicar</button>
      </div>
        <DataTable
          value={registers}
          selectionMode="checkbox"
          selection={selectedRegisters}
          onSelectionChange={(e) => setSelectedRegisters(e.value)}
          dataKey="key"
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
          <Column field="no_ctrl" header="Número de Control" />
          <Column field="name" header="Nombre" />
          <Column field="last_name" header="Apellidos" />
          <Column field="subject.key" header="Materia" />
          <Column field="laboratory.key" header="Laboratorio" />
          <Column field="pc.data" header="PC" />
          <Column body={actionBodyTemplate} style={{ minWidth: '12rem' }} />
        </DataTable>
      </div>

      <Dialog
        visible={registerDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Actualizar registro"
        modal
        className="p-fluid"
        footer={registerDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Laboratorio
          </label>
          <Dropdown
            value={selectedLaboratory}
            onChange={(e) => setSelectedLaboratory(e.value)}
            options={laboratories}
            className="md:w-20rem w-full"
            placeholder="Selecciona una PC"
          />
          {submitted && !selectedLaboratory && (
            <small className="p-error">Laboratorio es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="description" className="font-bold">
            Materia
          </label>
          <Dropdown
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.value)}
            options={subjects}
            className="md:w-20rem w-full"
            placeholder="Selecciona una materia"
          />
          {submitted && !selectedSubject && (
            <small className="p-error">La materia es requerida.</small>
          )}
        </div>

        <div className="field">
          <label className="mb-3 font-bold">PC</label>
          <Dropdown
            value={selectedPC}
            onChange={(e) => setSelectedPC(e.value)}
            options={pcs}
            className="md:w-20rem w-full"
            placeholder="Selecciona una PC"
          />
          {submitted && !selectedPC && (
            <small className="p-error">El equipo es requerido.</small>
          )}
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="price" className="font-bold">
              Estudiante
            </label>
            <InputText
              value={student}
              onChange={(e) => setStudent(e.target.value)}
            />
          </div>
          <div className="field col">
            <label htmlFor="quantity" className="font-bold">
              Observaciones:
            </label>
            <InputTextarea
              id="notes"
              value={register.note}
              onChange={(e) => setRegister({ ...register, note: e.target.value })}
              rows={3}
              cols={20}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteRegisterDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deleteRegisterDialogFooter}
        onHide={hideDeleteRegisterDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {register && (
            <span>
              ¿En verdad quieres eliminar el registro? <b>{register.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteRegistersDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deleteRegistersDialogFooter}
        onHide={hideDeleteRegistersDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {register && <span>¿Quieres eliminar todos los registros seleccionados?</span>}
        </div>
      </Dialog>

    </>
  );
}