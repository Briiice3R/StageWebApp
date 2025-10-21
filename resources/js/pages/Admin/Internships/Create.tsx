import {Head, Form} from "@inertiajs/react";
export default function CreateInternship(){
    
    return(
        <>
            <Head title="Ajouter un stage">
                
            </Head>
            <div className="bg-red-100 min-h-screen p-4">
                <Form disableWhileProcessing action="/admin/internships" method="POST">
                    <div className="">
                        <label htmlFor="siren">Nom de l'entreprise</label>
                        <input className="border-2 border-blue-200" name="siren" id="siren" type="text" />
                    </div>
                    <div>
                        <label htmlFor="startDate">Date de début du stage</label>
                        <input className="border-2 border-blue-200" type="date" name="internship.startDate" id="startDate" />
                    </div>

                    <div>
                        <label htmlFor="endDate">Date de fin du stage</label>
                        <input className="border-2 border-blue-200" type="date" name="internship.endDate" id="endDate" />
                    </div>

                    <div>
                        <p>Télétravail :</p>
                        <label htmlFor="remoteYes">Oui</label>
                        <input name="isRemote" id="remoteYes" type="radio" value="Oui" />
                        <label htmlFor="remoteNo">Non</label>
                        <input name="isRemote" id="remoteNo" type="radio" value="Non" />
                    </div>

                    <div>
                        <label htmlFor="internshipSubject">Sujet de stage</label>
                        <input className="border-2 border-blue-200" name="internship.subject" id="internshipSubject" type="text" />
                    </div>

                    <div>
                        <label htmlFor="studentTask">Tâches de l'étudiant</label>
                        <input className="border-2 border-blue-200" name="internship.studentTask" id="studentTask" type="text" />
                    </div>

                    <div>
                        <label htmlFor="comment">Commentaire</label>
                        <input className="border-2 border-blue-200" name="internship.comment" id="comment" type="text" />
                    </div>

                    <div>
                        <label htmlFor="student">Étudiant en stage :</label>
                        <input className="border-2 border-blue-200" name="internship.student" id="student" type="text" />
                    </div>

                    <div>
                        <label htmlFor="teacher">Maître de stage :</label>
                        <input className="border-2 border-blue-200" name="internship.teacher" id="teacher" type="text" />
                    </div>

                    <div className="bg-gray-200">
                        <h2>Tuteur de stage</h2>
                        <div>
                            <label htmlFor="supervisorName">Nom</label>
                            <input className="border-2 border-blue-200" name="supervisor.name" id="supervisorName" type="text" />
                        </div>

                        <div>
                            <label htmlFor="supervisorMail">Mail</label>
                            <input className="border-2 border-blue-200" name="supervisor.mail" id="supervisorMail" type="text" />
                        </div>

                        <div>
                            <label htmlFor="supervisorPhone">Téléphone</label>
                            <input className="border-2 border-blue-200" name="supervisor.phone" id="supervisorPhone" type="text" />
                        </div>
                    </div>


                    <button className="border-2 border-blue-200 cursor-pointer">Envoyer</button>
                </Form>
            </div>
        </>
    )
}